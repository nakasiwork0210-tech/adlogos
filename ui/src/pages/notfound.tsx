export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - ページが見つかりません</h1>
        <p className="text-gray-600 mb-6">指定されたページは存在しないか、URLが間違っています。</p>
        <a href="/" className="text-blue-500 hover:underline">ホームに戻る</a>
      </div>
    );
  }
  