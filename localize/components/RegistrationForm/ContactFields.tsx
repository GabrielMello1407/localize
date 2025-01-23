import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function ContactFields() {
  return (
    <>
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-4">Dados de Contato</h2>
      </div>
      <div className="col-span-2">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu nome completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento:</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu WhatsApp" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
