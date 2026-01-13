export default function SectionCard({ title, description, image }) {
  return (
    <div className="border rounded-lg shadow p-6 max-w-3xl mx-auto flex flex-col items-center">
      {image && <img src={image} alt={title} className="mb-4 rounded-lg" />}
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
