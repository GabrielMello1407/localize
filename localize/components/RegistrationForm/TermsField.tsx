import {
  FormField,
  FormLabel,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default function TermsField() {
  return (
    <div className="col-span-3 flex items-center">
      <FormField
        name="termsAccepted"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            </FormControl>
            <FormLabel>
              Eu concordo com os{' '}
              <Link
                href="/termos"
                className="text-red-500 underline"
                target="_parent"
              >
                termos de uso
              </Link>
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}
