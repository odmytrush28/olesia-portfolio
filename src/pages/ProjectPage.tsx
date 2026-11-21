import { projects } from '../data/content'
import { MedlineCase } from '../sections/case/MedlineCase'
import { CyberCase } from '../sections/case/CyberCase'
import { SoundtrackCase } from '../sections/case/SoundtrackCase'
import { GenericCase } from '../sections/case/GenericCase'
import { NotFoundPage } from './NotFoundPage'

export function ProjectPage({ id }: { id: string }) {
  if (id === 'medline') return <MedlineCase />
  if (id === 'cybersecurity-challenge') return <CyberCase />
  if (id === 'cycle-soundtrack') return <SoundtrackCase />
  const p = projects.find((x) => x.id === id)
  return p ? <GenericCase p={p} /> : <NotFoundPage />
}
