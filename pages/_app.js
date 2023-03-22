import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/swiper-bundle.css";
import { ThemeProvider } from "@material-tailwind/react";
import "react-phone-number-input/style.css";
// 1. import `NextUIProvider` component
import { AuthProvider } from "@/context/AuthContext";
import { VolunteerProvider } from "@/context/VolunteerContext";
import { ContactProvider } from "@/context/ContactContext";
import { DonationProvider } from "@/context/DonationContext";
import { MembershipProvider } from "@/context/MembershipContext";
import { VendorProvider } from "@/context/VendorContext";
import { InvestProvider } from "@/context/InvestContext";
import { PetitionProvider } from "@/context/PetitioContext";
import { ModeProvider } from "@/context/ModeContext";



export default function MyApp({ Component, pageProps }) {

  


  return (
    <div id="theme" className="">
      <ModeProvider>
        <ThemeProvider>
          <AuthProvider>
            <MembershipProvider>
              <VolunteerProvider>
                <PetitionProvider>
                  <VendorProvider>
                    <InvestProvider>
                      <DonationProvider>
                        <ContactProvider>
                          <Component {...pageProps} />
                        </ContactProvider>
                      </DonationProvider>
                    </InvestProvider>
                  </VendorProvider>
                </PetitionProvider>
              </VolunteerProvider>
            </MembershipProvider>
          </AuthProvider>
        </ThemeProvider>
      </ModeProvider>
    </div>
  );
}
