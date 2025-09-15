export default class Color {
  public static Rgba(alpha: number) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  public static Hex() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
  }
  public static Hsla() {
    const angle = Math.floor(Math.random() * 360);
    return "hsla(" + angle + ",100%,50%,1)";
  }
}
