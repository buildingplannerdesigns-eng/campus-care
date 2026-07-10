type DesktopVideoMockupProps = {
  title?: string;
  videoSrc?: string;
  embedUrl?: string;
  poster?: string;
  urlBar?: string;
};

export function DesktopVideoMockup({
  title = "Dr. Cammie Connor — ACT Healing",
  videoSrc,
  embedUrl,
  poster,
  urlBar = "campuscare.com",
}: DesktopVideoMockupProps) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Monitor */}
      <div className="overflow-hidden rounded-xl bg-[#1e1e1e] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.28)] ring-1 ring-black/20 sm:p-4">
        {/* Browser chrome */}
        <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
          </div>
          <div className="hidden flex-1 items-center justify-center sm:flex">
            <div className="w-full max-w-md rounded-md bg-[#2a2a2a] px-4 py-1.5 text-center text-[10px] text-white/45">
              {urlBar}
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="relative aspect-video overflow-hidden rounded-md bg-[#0d2433]">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : videoSrc ? (
            <video className="h-full w-full object-cover" controls playsInline poster={poster}>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: poster
                    ? `url(${poster})`
                    : "linear-gradient(135deg, #0d3d4f 0%, #1F5C73 50%, #3D5A3A 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm sm:h-16 sm:w-16">
                  <svg className="h-7 w-7 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="px-6 text-center font-display text-sm italic text-white/85 sm:text-base">
                  {title}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stand */}
      <div className="mx-auto mt-0 h-3 w-[42%] rounded-b-lg bg-[#2a2a2a] sm:h-4" />
      <div className="mx-auto h-2 w-[18%] rounded-b-md bg-[#1a1a1a]" />
    </div>
  );
}
