
import { FloatingInputProps } from "../types";

export default function FloatingInput({
    label,
    name,
    type = "text",
    value,
    onChange,
}: FloatingInputProps) {

    return (
        <div className="relative w-full">
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    required
    placeholder=" "
    className="peer w-full border-b border-gray-800 bg-transparent px-1 pt-5 py-2.5 text-sm text-gray-700 focus:border-gray-400 focus:outline-none placeholder-transparent"
  />
  <label
    htmlFor={name}
    className="absolute left-1 top-0 text-gray-500 text-sm transition-all duration-200 ease-in-out  peer-placeholder-shown:text-base  peer-focus:top-[4px] peer-focus:text-xs peer-focus:text-gray-700 pointer-events-none"
  >
    {label}
  </label>
</div>

    );
}
