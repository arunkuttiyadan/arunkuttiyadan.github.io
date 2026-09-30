from __future__ import annotations

import math
import random
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/generated/ai-engineer-intro.jpg"
OUTPUT = ROOT / "public/generated/ai-engineer-intro.mp4"
WIDTH, HEIGHT = 1280, 720
FPS = 24
DURATION = 5.2
FRAMES = round(FPS * DURATION)


def ease(value: float) -> float:
    return value * value * (3 - 2 * value)


def camera_frame(source: Image.Image, progress: float) -> Image.Image:
    zoom = 1.075 - 0.035 * ease(progress) + 0.004 * math.sin(progress * math.pi * 2)
    crop_width = source.width / zoom
    crop_height = crop_width * HEIGHT / WIDTH
    center_x = source.width * (0.515 + 0.015 * progress)
    center_y = source.height * (0.50 - 0.008 * progress)
    left = max(0, min(source.width - crop_width, center_x - crop_width / 2))
    top = max(0, min(source.height - crop_height, center_y - crop_height / 2))
    crop = source.crop((left, top, left + crop_width, top + crop_height))
    return crop.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)


def draw_network(overlay: Image.Image, time_seconds: float) -> None:
    draw = ImageDraw.Draw(overlay, "RGBA")
    center = (1040, 225)
    nodes = [
        (890, 112), (966, 86), (1051, 102), (1135, 134), (1192, 195),
        (1165, 273), (1086, 305), (996, 292), (923, 252), (955, 188),
        (1032, 170), (1111, 204), (1068, 250), (1000, 235),
    ]
    edges = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7),
             (7, 8), (8, 0), (0, 9), (1, 10), (2, 10), (3, 11), (4, 11),
             (5, 12), (6, 12), (7, 13), (8, 13), (9, 10), (10, 11),
             (11, 12), (12, 13), (13, 9), (10, 12)]
    for index, (start, end) in enumerate(edges):
        pulse = (math.sin(time_seconds * 3.0 - index * 0.42) + 1) / 2
        alpha = int(28 + pulse * 78)
        draw.line((nodes[start], nodes[end]), fill=(239, 126, 50, alpha), width=1)
        if pulse > 0.83:
            fraction = (time_seconds * 0.55 + index * 0.13) % 1
            x = nodes[start][0] + (nodes[end][0] - nodes[start][0]) * fraction
            y = nodes[start][1] + (nodes[end][1] - nodes[start][1]) * fraction
            draw.ellipse((x - 3, y - 3, x + 3, y + 3), fill=(255, 214, 130, 220))
    for index, (x, y) in enumerate(nodes):
        pulse = 2.5 + 2 * ((math.sin(time_seconds * 4 + index) + 1) / 2)
        draw.ellipse((x - pulse, y - pulse, x + pulse, y + pulse), fill=(255, 151, 70, 190))

    for ring_index, radius in enumerate((82, 110, 140)):
        phase = time_seconds * (62 if ring_index % 2 == 0 else -48) + ring_index * 51
        box = (center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius)
        draw.arc(box, start=phase, end=phase + 130, fill=(239, 126, 50, 135), width=2)
        draw.arc(box, start=phase + 190, end=phase + 248, fill=(168, 198, 122, 105), width=1)


def draw_particles(overlay: Image.Image, particles: list[tuple[float, float, float, float, int]], time_seconds: float) -> None:
    draw = ImageDraw.Draw(overlay, "RGBA")
    positions = []
    for x, y, vx, vy, size in particles:
        px = (x + vx * time_seconds) % WIDTH
        py = (y + vy * time_seconds) % HEIGHT
        positions.append((px, py))
        flicker = 0.55 + 0.45 * math.sin(time_seconds * 4.2 + x * 0.01)
        alpha = int(55 + flicker * 125)
        color = (239, 126, 50, alpha) if size > 1 else (168, 198, 122, alpha)
        draw.ellipse((px - size, py - size, px + size, py + size), fill=color)
    for index in range(0, len(positions) - 1, 3):
        x1, y1 = positions[index]
        x2, y2 = positions[index + 1]
        distance = math.hypot(x2 - x1, y2 - y1)
        if distance < 150:
            draw.line((x1, y1, x2, y2), fill=(239, 126, 50, max(0, int(55 - distance / 4))), width=1)


def add_light_sweep(frame: Image.Image, progress: float) -> Image.Image:
    sweep = Image.new("RGBA", frame.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(sweep, "RGBA")
    x = int(-260 + progress * (WIDTH + 520))
    draw.polygon([(x - 150, 0), (x + 45, 0), (x + 310, HEIGHT), (x + 80, HEIGHT)], fill=(239, 126, 50, 24))
    return Image.alpha_composite(frame.convert("RGBA"), sweep.filter(ImageFilter.GaussianBlur(22)))


def glitch(frame: Image.Image, progress: float, frame_index: int) -> Image.Image:
    active = progress < 0.12 or progress > 0.91
    if not active or frame_index % 2:
        return frame
    result = frame.copy()
    rng = random.Random(3100 + frame_index)
    for _ in range(7):
        y = rng.randint(0, HEIGHT - 24)
        height = rng.randint(5, 24)
        shift = rng.randint(-32, 32)
        strip = frame.crop((0, y, WIDTH, y + height))
        result.paste(strip, (shift, y))
    return result


def main() -> None:
    source = Image.open(SOURCE).convert("RGB")
    source = ImageEnhance.Contrast(source).enhance(1.06)
    source = ImageEnhance.Color(source).enhance(0.94)
    rng = random.Random(42)
    particles = [
        (rng.uniform(0, WIDTH), rng.uniform(0, HEIGHT), rng.uniform(-10, 22), rng.uniform(-18, 6), rng.choice((1, 1, 1, 2)))
        for _ in range(76)
    ]

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    command = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{WIDTH}x{HEIGHT}",
        "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264",
        "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(OUTPUT),
    ]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    for frame_index in range(FRAMES):
        progress = frame_index / max(1, FRAMES - 1)
        time_seconds = frame_index / FPS
        frame = camera_frame(source, progress)
        frame = add_light_sweep(frame, progress)

        effects = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        draw_particles(effects, particles, time_seconds)
        draw_network(effects, time_seconds)
        effects = effects.filter(ImageFilter.GaussianBlur(0.25))
        frame = Image.alpha_composite(frame, effects)

        scan = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
        scan_draw = ImageDraw.Draw(scan, "RGBA")
        scan_y = int((time_seconds * 145) % (HEIGHT + 80)) - 40
        scan_draw.rectangle((0, scan_y, WIDTH, scan_y + 2), fill=(168, 198, 122, 34))
        frame = Image.alpha_composite(frame, scan)
        frame = glitch(frame.convert("RGB"), progress, frame_index)
        process.stdin.write(np.asarray(frame.convert("RGB"), dtype=np.uint8).tobytes())

    process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("ffmpeg failed to render the intro video")


if __name__ == "__main__":
    main()
