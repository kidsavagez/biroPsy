'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const schema = z.object({
  clientName: z.string().min(3, 'Nama minimal 3 karakter'),
  clientEmail: z.string().email('Format email tidak valid'),
  clientPhone: z.string().min(9, 'Nomor telepon tidak valid'),
  clientWhatsapp: z.string().min(9, 'Nomor WhatsApp tidak valid'),
  reason: z.string().min(10, 'Tuliskan alasan minimal 10 karakter'),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  values: Partial<FormValues>
  onChange: (values: Partial<FormValues>) => void
  onValidityChange: (valid: boolean) => void
}

export default function Step4Info({ values, onChange, onValidityChange }: Props) {
  const {
    register,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: values as FormValues,
  })

  const watched = watch()

  useEffect(() => {
    onChange(watched)
  }, [JSON.stringify(watched)])

  useEffect(() => {
    onValidityChange(isValid)
  }, [isValid])

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-1">Informasi Pribadi</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Data Anda dijaga kerahasiaannya sesuai kode etik profesi psikologi.
      </p>

      <div className="space-y-5">
        <div>
          <Label className="text-sm font-medium">Nama Lengkap *</Label>
          <Input
            {...register('clientName')}
            placeholder="Masukkan nama lengkap Anda"
            className="mt-1.5 rounded-xl"
          />
          {errors.clientName && (
            <p className="text-xs text-destructive mt-1">{errors.clientName.message}</p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Email *</Label>
            <Input
              {...register('clientEmail')}
              type="email"
              placeholder="email@anda.com"
              className="mt-1.5 rounded-xl"
            />
            {errors.clientEmail && (
              <p className="text-xs text-destructive mt-1">{errors.clientEmail.message}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium">Nomor Telepon *</Label>
            <Input
              {...register('clientPhone')}
              type="tel"
              placeholder="08xxxxxxxxxx"
              className="mt-1.5 rounded-xl"
            />
            {errors.clientPhone && (
              <p className="text-xs text-destructive mt-1">{errors.clientPhone.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Nomor WhatsApp *</Label>
          <Input
            {...register('clientWhatsapp')}
            type="tel"
            placeholder="08xxxxxxxxxx (untuk pengingat sesi)"
            className="mt-1.5 rounded-xl"
          />
          {errors.clientWhatsapp && (
            <p className="text-xs text-destructive mt-1">{errors.clientWhatsapp.message}</p>
          )}
        </div>

        <div>
          <Label className="text-sm font-medium">Alasan Konsultasi *</Label>
          <Textarea
            {...register('reason')}
            placeholder="Ceritakan secara singkat apa yang ingin Anda diskusikan dalam sesi ini..."
            className="mt-1.5 rounded-xl min-h-[100px] resize-none"
          />
          {errors.reason && (
            <p className="text-xs text-destructive mt-1">{errors.reason.message}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Informasi ini hanya dibagikan ke terapis Anda dan bersifat rahasia.
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">
            Catatan Tambahan <span className="text-muted-foreground">(opsional)</span>
          </Label>
          <Textarea
            {...register('notes')}
            placeholder="Ada hal lain yang ingin kami ketahui? (alergi obat, kebutuhan khusus, dll.)"
            className="mt-1.5 rounded-xl min-h-[80px] resize-none"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-accent/30 rounded-xl border border-brand/20 text-xs text-muted-foreground">
        🔒 Semua informasi di atas dienkripsi dan hanya dapat diakses oleh terapis Anda dan tim admin.
        Tidak akan pernah dibagikan ke pihak ketiga tanpa izin Anda.
      </div>
    </div>
  )
}
