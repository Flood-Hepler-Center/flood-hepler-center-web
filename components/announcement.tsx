'use client';
export default function AnnouncementComponent() {
  const data = ['ทดสอบ', 'ทดสอบ 2', 'ทดสอบ 3', 'ทดสอบ 4', 'ทดสอบ 5'];

  return (
    <div className='flex items-center text-center justify-center gap-x-6 overflow-hidden bg-red-700 px-6 py-2.5'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-2 w-full'>
        <div className='text-md md:text-lg w-full'>
          <strong className='font-semibold text-write'>ประกาศสำคัญ</strong>
          <div className='relative flex overflow-x-hidden'>
            <div className='animate-marquee whitespace-nowrap'>
              {data.map((item, index) => (
                <span
                  key={index}
                  className='px-4 text-white border-r-1 border-red-300 border-spacing-7'
                >
                  {item}
                </span>
              ))}
            </div>

            <div className='absolute top-0 animate-marquee2 whitespace-nowrap'>
              {data.map((item, index) => (
                <span
                  key={index}
                  className='px-4 text-white border-r-1 border-red-300 border-spacing-7'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
