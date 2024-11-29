import React, { useState } from 'react';
import { Card, Input, Textarea, Button } from '@nextui-org/react';

const CustomGoogleForm = () => {
  const [formData, setFormData] = useState({
    entry_1084532222: '', // Name
    entry_822736917: '', // Address
    entry_894090094: '', // Subdistrict
    entry_1209361838: '', // District
    entry_1679905954: '', // Province
    entry_1191905746: '', // Postal code
    entry_1246982716: '', // Help details
    entry_615899162: '', // Phone
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formUrl =
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdlbLDI-bkatms9YpkNRHEgPASvcysu0NASymg4JFqIPk_37Q/formResponse';

    try {
      const formDataEncoded = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formDataEncoded.append(key, value);
      });

      const response = await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Forms requires this
        body: formDataEncoded,
      });

      if (response.ok || response.type === 'opaque') {
        setSuccessMessage('ส่งข้อมูลสำเร็จ! ขอบคุณสำหรับการกรอกแบบฟอร์ม');
        setFormData({
          entry_1084532222: '',
          entry_822736917: '',
          entry_894090094: '',
          entry_1209361838: '',
          entry_1679905954: '',
          entry_1191905746: '',
          entry_1246982716: '',
          entry_615899162: '',
        });
      } else {
        throw new Error('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSuccessMessage('เกิดข้อผิดพลาด! โปรดลองอีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {successMessage ? (
        <p className='text-center text-lg font-semibold text-green-600'>
          {successMessage}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <Input
              label='ชื่อ'
              name='entry_1084532222'
              fullWidth
              value={formData.entry_1084532222}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <Textarea
              label='ที่อยู่ (พอสังเขป)'
              name='entry_822736917'
              fullWidth
              value={formData.entry_822736917}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <Input
              label='จังหวัด'
              name='entry_1679905954'
              fullWidth
              value={formData.entry_1679905954}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <Textarea
              label='สิ่งที่ต้องการให้ช่วยเหลือ'
              name='entry_1246982716'
              fullWidth
              value={formData.entry_1246982716}
              onChange={handleChange}
            />
          </div>

          <div className='mb-4'>
            <Input
              label='เบอร์โทร'
              name='entry_615899162'
              fullWidth
              value={formData.entry_615899162}
              onChange={handleChange}
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-surface'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อมูล'}
          </Button>
        </form>
      )}
    </>
  );
};

export default CustomGoogleForm;
