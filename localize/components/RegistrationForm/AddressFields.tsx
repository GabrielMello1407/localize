import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function AddressFields({
  handleCepSearch,
}: {
  handleCepSearch: () => void;
}) {
  return (
    <>
      <div className="col-span-2">
        <FormField
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu endereço" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu bairro" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="houseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número da Casa:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Digite o número da sua casa"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite sua cidade" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado:</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite seu estado" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-2 flex items-center gap-2 relative">
        <FormField
          name="cep"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>CEP:</FormLabel>
              <FormControl className="relative">
                <Input {...field} placeholder="Digite seu CEP" />
              </FormControl>
              <Button
                type="button"
                variant="icon"
                className="absolute right-0 top-0 h-full border-l-0 rounded-l-none p-2 flex items-center justify-center"
                onClick={handleCepSearch}
              >
                <Search size={20} />
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
