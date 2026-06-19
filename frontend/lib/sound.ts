export const playSound = (
  file: string
) => {
  try {
    const audio = new Audio(
      `/sounds/${file}`
    );

    audio.volume = 0.35;

    audio.play().catch(() => {});
  } catch {}
};