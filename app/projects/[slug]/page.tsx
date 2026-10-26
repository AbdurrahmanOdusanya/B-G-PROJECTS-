import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FEATURED_PROJECTS } from '@/data/projects';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} | Architectural Residence`,
    description: project.tagline || project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
