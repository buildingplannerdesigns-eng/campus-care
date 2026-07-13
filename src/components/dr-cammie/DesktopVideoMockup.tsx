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
}: DesktopVideoMockupProps) {
  return (
    <div className="mx-auto w-full max-w-[860px]">
      {/* Silver iMac-style chassis */}
      <div
        className="rounded-[1.15rem] p-[11px] sm:rounded-[1.4rem] sm:p-[14px]"
        style={{
          background:
            "linear-gradient(180deg, #f4f4f5 0%, #e4e4e7 42%, #d4d4d8 78%, #c8c8cd 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.85) inset, 0 28px 55px rgba(15,23,42,0.16), 0 8px 18px rgba(15,23,42,0.08)",
        }}
      >
        {/* Thin black bezel + screen */}
        <div className="overflow-hidden rounded-[0.55rem] bg-[#0a0a0a] p-[5px] sm:rounded-[0.7rem] sm:p-[6px]">
          <div className="relative aspect-video overflow-hidden rounded-[0.28rem] bg-[#111] sm:rounded-[0.35rem]">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-white/15 backdrop-blur-sm sm:h-14 sm:w-14">
                    <svg className="h-6 w-6 translate-x-0.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="max-w-md px-6 text-center font-display text-sm italic text-white/90 sm:text-base">
                    {title}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chin */}
      <div
        className="mx-auto h-[10px] w-[34%] rounded-b-md sm:h-3"
        style={{
          background: "linear-gradient(180deg, #d8d8dc 0%, #c4c4c9 100%)",
        }}
      />

      {/* Neck */}
      <div
        className="mx-auto h-9 w-[9%] sm:h-11 sm:w-[8%]"
        style={{
          background: "linear-gradient(90deg, #c8c8cd 0%, #ececef 45%, #d0d0d5 100%)",
          clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Foot + soft ground shadow */}
      <div className="relative mx-auto">
        <div
          className="mx-auto h-[7px] w-[26%] rounded-full sm:h-2 sm:w-[24%]"
          style={{
            background: "linear-gradient(180deg, #e8e8eb 0%, #bdbdc3 100%)",
            boxShadow: "0 10px 22px rgba(15,23,42,0.18)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-2 h-4 w-[42%] -translate-x-1/2 rounded-[100%] bg-black/15 blur-md"
          aria-hidden
        />
      </div>
    </div>
  );
}
