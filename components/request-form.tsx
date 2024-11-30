import React, { useState, useMemo } from 'react';
import {
  Card,
  Input,
  Textarea,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Link,
} from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { PHONE_NUMBER } from '@/data';
import { PhoneIcon } from './icons';

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
  const [selectedProvince, setSelectedProvince] = useState('จังหวัดทั้งหมด');

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
        setSelectedProvince(formData.entry_1679905954); // Set selectedProvince to submitted province
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

  // Filter phone numbers based on the selected province
  const filteredPhoneNumbers = useMemo(() => {
    if (selectedProvince === 'จังหวัดทั้งหมด') {
      return PHONE_NUMBER;
    }
    return PHONE_NUMBER.filter((item) => item.location === selectedProvince);
  }, [selectedProvince]);

  return (
    <>
      {successMessage ? (
        <div>
          <p className='text-center text-lg font-semibold text-green-600'>
            {successMessage}
          </p>
          <p className='text-center text-md font-semibold'>
            ท่านสามารถติดต่อหน่วยงานตามนี้ได้ก่อนเบื้องต้น
          </p>
          <Table aria-label='Phone Numbers' isStriped className='text-sm'>
            <TableHeader>
              <TableColumn>ชื่อ</TableColumn>
              <TableColumn>เบอร์โทรศัพท์</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {filteredPhoneNumbers.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNo}</TableCell>
                  <TableCell>
                    <Link href={`tel:${item.phoneNo}`}>
                      <PhoneIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
