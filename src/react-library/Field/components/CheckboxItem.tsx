const CheckboxItem = ({
  index,
  id,
  name,
  value,
  checked,
  className,
  handleChange,
}: {
  index: number;
  id: string;
  name: string;
  value: string;
  checked:boolean;
  className: string;
  handleChange: Function;
}) => {
  return (
    <input
      id={id}
      className={className}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      onChange={({ target }) => {
        // checkedHelpers.setValue(target);
        // valueHelpers.setValue(target.value);
        // checkedHelpers.setTouched(true);
        // valueHelpers.setTouched(true);
        handleChange(target, value, index);
      }}
    />
  );
};

export default CheckboxItem;
