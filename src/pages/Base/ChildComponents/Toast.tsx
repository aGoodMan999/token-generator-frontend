import { Toaster, toast } from "sonner";

// ...

export default function ToastComponent() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  );
}
