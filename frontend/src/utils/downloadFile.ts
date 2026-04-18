export const downloadFile = ({
  fileName,
  content,
}: {
  fileName: string;
  content: string;
}) => {
  const file = new File([content], fileName, {
    type: "application/json",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(file);

  link.href = url;
  link.download = file.name;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
