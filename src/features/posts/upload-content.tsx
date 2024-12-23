import { ReactNode } from "react";
import { useDropzone } from "react-dropzone";

interface UploadContentProps {
  multiSelect: boolean;
  onUpload: (files: File[]) => void;
  acceptTypes?: { [key: string]: string[] };

  children: ReactNode;
}
const UploadContent = function ({
  multiSelect,
  onUpload,
  children,
  acceptTypes = { "image/*": [], "video/*": [] }
}: UploadContentProps) {
  const onDrop = (acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptTypes,
    onDrop,
    multiple: multiSelect
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      {children}
    </div>
  );
};

export default UploadContent;
