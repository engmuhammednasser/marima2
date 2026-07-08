export function ReviewCard({ text, author, stars = "★★★★★" }: { text: string; author: string; stars?: string }) {
  return (
    <article className="reviewCard">
      <div className="reviewStars">{stars}</div>
      <p>{text}</p>
      <strong>{author}</strong>
    </article>
  );
}
