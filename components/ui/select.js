export function Select({ children, ...props }) { return <select {...props} className="border p-2 w-full">{children}</select>; }
export function SelectTrigger({ children }) { return <>{children}</>; }
export function SelectValue({ placeholder }) { return <option>{placeholder}</option>; }
export function SelectContent({ children }) { return <>{children}</>; }
export function SelectItem({ children, value }) { return <option value={value}>{children}</option>; }