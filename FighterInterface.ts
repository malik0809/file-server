export interface Fighter {
    id: number;
    naam: string;
    beschrijving: string;
    leeftijd: number;
    actief: boolean;
    geboortedatum: string;
    profielfotoUrl: string;
    status: string;
    gewichtsklasse: string;
    trainer: {
        id: number;
        naam: string;
        specialiteit: string;
        ervaring: number;
        profielfotoUrl: string;
    };
}