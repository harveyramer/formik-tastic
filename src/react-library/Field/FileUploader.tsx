import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FieldProps } from "./types";
import { Properties } from "csstype";
import { changeHandler } from "../utils";

interface FileUpload extends File {
  path: string;
}

const thumbsContainer: Properties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: "16",
};

const thumb: Properties = {
  display: "inline-flex",
  borderRadius: "2",
  border: "1px solid #eaeaea",
  marginBottom: "8",
  marginRight: "8",
  width: "100",
  height: "100",
  padding: "4",
  boxSizing: "border-box",
};

const thumbInner: Properties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: Properties = {
  display: "block",
  width: "auto",
  height: "100%",
};

const baseStyle: Properties = {
  width: "100%",
  height: "200",
  borderWidth: "2",
  borderColor: "#666",
  borderStyle: "dashed",
  borderRadius: "5",
  padding: "10",
};

const activeStyle: Properties = {
  borderColor: "#6c6",
  backgroundColor: "#eee",
};

const acceptStyle: Properties = {
  borderColor: "#00e676",
};

const rejectStyle: Properties = {
  borderColor: "#ff1744",
};

const FileUploader = ({ config, formik, error }: FieldProps) => {
  const {
    name,
    options,
    zoneInactiveText = "Drag and drop some files here, or click to select files",
    zoneActiveText = "Drop the files here ...",
    hasThumbs = false,
  } = config;
  const { setFieldValue, setFieldError, handleBlur, setFieldTouched } = formik;
  const prepareFileUploderOptions = (
    { onDrop, onDropAccepted, onDropRejected, ...options }: any,
    formik: any,
    config: any
  ) => {
    options.onDrop = onDrop
      ? onDrop.bind(this, formik, config)
      : (accepted: any, rejected: any, uploadEvent: any) => {
          setFieldValue(
            name,
            (accepted as File[]).map((f: File) => f.name)
          );
        };
    options.onDropAccepted = onDropAccepted
      ? onDropAccepted(formik, config)
      : null;
    options.onDropRejected = onDropRejected
      ? onDropRejected(formik, config)
      : null;
    return options;
  };
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    ...prepareFileUploderOptions({ ...options }, formik, config),
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );
  const filesEls = acceptedFiles.map((file: File) => {
    return hasThumbs ? (
      <div style={thumb} key={(file as FileUpload).path}>
        <div style={thumbInner}>
          <img src={URL.createObjectURL(file)} alt={file.type} style={img} />
        </div>
      </div>
    ) : (
      <li className="text-success" key={(file as FileUpload).path}>
        {(file as FileUpload).path} - {file.size} bytes
      </li>
    );
  });
  const files = hasThumbs ? (
    filesEls
  ) : (
    <ul className="list-unstyled my-3">{filesEls}</ul>
  );
  const rejectsEls = fileRejections.map(
    (uploadErr: { file: File; errors: any[] }) => {
      return (
        <li className="text-danger" key={(uploadErr.file as FileUpload).path}>
          {(uploadErr.file as FileUpload).path} - {uploadErr.file.size} bytes -{" "}
          {uploadErr.errors.map((e) => e.message).join(", ")}
        </li>
      );
    }
  );
  const rejects = <ul className="list-unstyled my-3">{rejectsEls}</ul>;
  return (
    <section className={"file-uploader" + (error ? " is-invalid " : "")}>
      <div className="p-4" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div>{zoneActiveText}</div>
        ) : (
          <div>{zoneInactiveText}</div>
        )}
      </div>
      {fileRejections?.length ? (
        <aside className="card border-danger my-3">
          <div className="card-body py-0">{rejects}</div>
        </aside>
      ) : null}
      <aside style={hasThumbs ? thumbsContainer : { display: "block" }}>
        {acceptedFiles?.length ? (
          <aside className="card border-success my-3">
            <div className="card-body py-0">{files}</div>
          </aside>
        ) : null}
      </aside>
    </section>
  );
};

export default React.memo(FileUploader);
