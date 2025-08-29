import { useTranslation } from '@/../hooks/useTranlation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "../atoms/SectionHeader";
import Button from "../atoms/Button";
import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";

export default function DashboardSection() {
  const t = useTranslation();

  return (
    <section id="dashboard" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 max-w-full overflow-hidden">
        <SectionHeader
          badge={t.dashboard.head}
          title={t.dashboard.title}
          description={t.dashboard.description}
        />
        <div className="mx-auto max-w-6xl mt-12">
          <Tabs defaultValue="analytics" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto pb-2 -mx-4 px-4">
              <TabsList className="flex-nowrap">
                {t.dashboard.tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="whitespace-nowrap">
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {t.dashboard.tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="relative border rounded-lg p-1">
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    text={t.dashboard.demo.watch}
                    className="bg-background/90 hover:bg-background hidden sm:flex"
                  >
                    <FaPlayCircle className="h-4 w-4 mr-2" />
                  </Button>
                  <Button size="sm" text={t.dashboard.demo.try} />
                </div>
                <div className="w-full max-w-[1200px] max-h-[400px] overflow-hidden">
                  <Image
                    src="/assets/withoutimg.jpg"
                    alt="Analytics Dashboard"
                    width={800}
                    height={400}
                    className="rounded-lg border shadow-lg w-full h-auto object-cover"
                  />
                </div>
                <div className="bg-background/95 backdrop-blur-sm absolute bottom-0 left-0 right-0 p-4 md:p-6 rounded-b-lg border-t">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{tab.title2}</h3>
                  <p className="text-muted-foreground mb-4 text-sm md:text-base">{tab.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tab.keys.map((feature) => (
                      <span key={feature} className="bg-muted px-3 py-1 rounded-full text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}