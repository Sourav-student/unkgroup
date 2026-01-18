
type Props = {
  params: Promise<{ id: string }>
}

export default async function UserProfile({ params }: Props) {

  const { id } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">
          User Profile
        </h1>

        <p className="text-slate-300 mb-6">
          This is the profile page for user
        </p>

        <span className="inline-block px-4 py-2 rounded-lg bg-orange-400 text-black font-semibold tracking-wide">
          {id}
        </span>
      </div>
    </div>
  );
}
