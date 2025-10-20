const Loading = async () => {
  return (
    <div className="w-full h-[50svh] flex justify-center items-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
      </div>
    </div>
  )
};

export default Loading;