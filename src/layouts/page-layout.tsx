export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen p-4">
      {children}
    </div>
  )
}