 
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import CreateCompanyForm from "./CreateCompanyForm"
 
export function CreateCompanyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Crear compañia</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
       <CreateCompanyForm />
      </DialogContent>
    </Dialog>
  )
}