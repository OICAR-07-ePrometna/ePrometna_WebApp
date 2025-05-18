import { UserRole } from "@/enums/userRole";

export interface NavigationGroup {
    Name: string;
    Links: NavigationLink[]
  }
  
export interface NavigationLink {
    Name: string;
    AllowRoles: UserRole[];
    Route: string;
  }
  
 export const navigationLinks: NavigationGroup[] = ([
    {
      Name: "Vozilo",
      Links: [
  
        {
          Name: "Promjena vlasništva",
          AllowRoles: [UserRole.HAK],
          Route: '/ownership-change'
        },
        {
          Name: "Novo vozilo",
          AllowRoles: [UserRole.HAK],
          Route: '/new-vehicle'
        },
        {
          Name: "Tehnički pregled",
          AllowRoles: [UserRole.HAK],
          Route: '/technical-check'
        },
        {
          Name: "Odjava vozila",
          AllowRoles: [UserRole.HAK],
          Route: '/vehicle-deregistration'
        },]
    },
    {
      Name: "Službenici",
      Links: [
        {
          Name: "Pregled službenika",
          AllowRoles: [UserRole.MupAdmin],
          Route: '/officer-overview'
        },
        {
          Name: "Novi službenik",
          //Kad neko optimizira forme za policiju i usere (police token field preciznije) nek makne superadmina odavde
          AllowRoles: [UserRole.MupAdmin, UserRole.SuperAdmin],
          Route: '/new-officer'
        },
      ]
    },
    {
      Name: "Promet",
      Links: [
        {
          Name: "Prometna dozvola",
          AllowRoles: [UserRole.Osoba],
          Route: '/traffic-license'
        },
        {
          Name: "Vozačka dozvola",
          AllowRoles: [UserRole.Osoba],
          Route: '/driver-license' 
        },
        {
          Name: "Uređaji",
          AllowRoles: [UserRole.Osoba],
          Route: '/devices'
        },
        {
          Name: "Vozila",
          AllowRoles: [UserRole.Osoba, UserRole.Firma],
          Route: '/vehicles'
        }
      ]
    },
    {
      Name: "Akcije",
      Links: [
         {
          Name: "Novi korisnik",
          AllowRoles: [UserRole.SuperAdmin],
          Route: '/new-user'
        },
        {
          Name: "Korisnici",
          AllowRoles: [UserRole.SuperAdmin],
          Route: '/users'
        }
      ]
    },
  ]);