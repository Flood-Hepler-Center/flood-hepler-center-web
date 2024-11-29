import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";

interface ReporterCardProps {
  title: string;
  content: string;
  contact: string;
  province: string;
  createdAt: string;
}

export default function ReporterCardComponent({
  title,
  content,
  contact,
  province,
  createdAt,
}: ReporterCardProps) {
  return (
    <Card className="w-full py-2 justify-between">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {title}
            </h4>
            <div className="text-small text-default-400 text-ellipsis overflow-hidden tracking-tight w-full">
              ติดต่อ: {contact}
            </div>
          </div>
        </div>
        <Button
          className="bg-transparent text-foreground border-default-200"
          radius="full"
          size="sm"
          color="default"
          variant="bordered"
        >
          #{province}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-2 text-small">
        <p>{content}</p>
      </CardBody>
      <CardFooter className="justify-between">
        <div className="flex gap-1">
          <p className="text-tiny text-default-400 italic">
            {createdAt}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
