import { getLocationById } from "@/lib/supabase";
import { notFound } from "next/navigation";
import EditLocationForm from "./EditLocationForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLocationPage({ params }: Props) {
  const { id } = await params;
  
  try {
    const location = await getLocationById(id);
    
    if (!location) {
      notFound();
    }

    return <EditLocationForm location={location} />;
  } catch (error) {
    console.error("Error fetching location:", error);
    notFound();
  }
}