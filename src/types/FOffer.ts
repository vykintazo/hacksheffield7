/** Firestore Offer document */
export interface FOffer {
    category: string;
    description: string;
    discount: number;
    end: Date;
    offerName: string;
    start: Date;
    type: string;
    uid: string;
};