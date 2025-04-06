import { UserRole } from "@/enums/enums";

export interface NavigationGroup {
    Name: string;
    Links: NavigationLink[]
  }
  
  interface NavigationLink {
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
          AllowRoles: [UserRole.Admin],
          Route: '/officer-overview'
        },
        {
          Name: "Novi službenik",
          AllowRoles: [UserRole.Admin],
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
        }
      ]
    },
  ]);