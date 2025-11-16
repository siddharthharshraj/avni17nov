import Container from "@/components/ui/Container";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Install App",
    description: (
      <>
        <Link 
          href="https://play.google.com/store/apps/details?id=com.openchsclient" 
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[#419372] decoration-2 underline-offset-2 hover:text-[#419372] transition-colors"
        >
          Download Avni App
        </Link>{" "}
        from Google Play Store on your Android device
      </>
    ),
  },
  {
    number: "2",
    title: "Pick A Demo Account",
    description: "Select A Demo Account From The Table Below That Matches Your Use Case",
  },
  {
    number: "3",
    title: "Explore Features",
    description: "Test data collection, offline sync, and reporting capabilities",
  },
];

export default function DemoSteps() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-[20px] p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow w-full md:w-[402px] h-[402px] flex flex-col justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FBA57F]/30 flex items-center justify-center mx-auto mb-6">
                <span className="font-anek font-bold text-2xl text-[#0b2540]">
                  {step.number}
                </span>
              </div>
              <h3 className="font-anek font-bold text-xl md:text-2xl text-[#0b2540] mb-4">
                {step.title}
              </h3>
              <p className="font-noto text-base leading-relaxed text-[#4A4A4A]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
