export default function AnnouncementComponent() {
  return (
    <div className='flex items-center text-center justify-center gap-x-6 overflow-hidden bg-red-700 px-6 py-2.5'>
      <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
        <p className='text-md md:text-lg'>
          <strong className='font-semibold'>ประกาศสำคัญ</strong>
          <svg
            viewBox='0 0 2 2'
            className='mx-2 inline size-0.5 fill-current'
            aria-hidden='true'
          >
            <circle cx='1' cy='1' r='1' />
          </svg>
          แจ้งเหตุฉุกเฉินน้ำท่วม ติดต่อ สภ.ใกล้เคียง หรือโทร 191
          เพื่อรับความช่วยเหลือด่วน
        </p>
      </div>
    </div>
  );
}
