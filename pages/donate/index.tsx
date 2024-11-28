import { useEffect } from "react";
import { debounce } from "lodash";
import { FilterIcon, PhoneIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { DONATION } from "@/data";
import DefaultLayout from "@/layouts/default";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function App() {
  const [selectedKeys, setSelectedKeys] = useState("ทั้งหมด");

  const uniqueLocation = DONATION.map((item) => item.name).filter(
    (value, index, self) => self.indexOf(value) === index
  );

  const filteredPhoneNumber = useMemo(() => {
    if (selectedKeys === "ทั้งหมด") {
      return DONATION;
    }
    return DONATION.filter((item) => item.name === selectedKeys);
  }, [selectedKeys]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((term: any) => {
    setSearchTerm(term);
  }, 300);

  const filteredByName = useMemo(() => {
    if (!searchTerm) return filteredPhoneNumber;
    return filteredPhoneNumber.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, filteredPhoneNumber]);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, []);

  const handleInputChange = (e: any) => {
    handleSearch(e.target.value);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block w-full text-center justify-center">
          <h1 className={title()}>รวมศูนย์รับบริจาค</h1>
        </div>
        <div className="flex w-full justify-center text-lg">
          <div className="w-full">
            <Input
              onChange={handleInputChange}
              type="email"
              label="ค้นหาชื่อ"
            />
          </div>
          {/* <div className="flex ml-3 items-center">
            <FilterIcon />
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedKeys}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(keys: any) =>
                  setSelectedKeys(Array.from(keys).join(", "))
                }
              >
                {uniqueLocation.map((item, index) => (
                  <DropdownItem key={item}>{item}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div> */}
        </div>
        <Table
          aria-label="contact helper phone number table"
          className="mt-2"
          isStriped
        >
          <TableHeader>
            <TableColumn>ผู้รับบริกาค</TableColumn>
            <TableColumn>ข้อมูลเพิ่มเติม</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredByName.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="text-bold pt-2">{item.name}</div>
                  <div className="py-2">{item.detail}</div>
                  <div className="pb-2">{item.bankAccount}</div> 
                </TableCell>
                <TableCell>
                  <Link href={`${item.link}`} passHref target="_blank">
                    <Button>เยี่ยมชม</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-center">
          <Link
            href={`https://forms.gle/Qjnbtruf8k8e4Bxi9`}
            passHref
            target="_blank"
          >
            <Button>เพิ่มรายชื่อผู้บริจาค</Button>
          </Link>
        </div>
      </section>
    </DefaultLayout>
  );
}
