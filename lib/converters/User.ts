import { db } from '@/firebase'
import 
{ 
    DocumentData, 
    FirestoreDataConverter, 
    QueryDocumentSnapshot, 
    SnapshotOptions, 
    collection,
    collectionGroup,
    doc,
    limit,
    orderBy,
    query,
    where
} from 'firebase/firestore'

import { User } from 'next-auth'

const userConvertor:FirestoreDataConverter<User>= {
    toFirestore: (customer: User): DocumentData=>{
        return {
            email: customer.email,
            image: customer.image,
            name: customer.name
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) =>{
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            email: data.email,
            image: data.image,
            name: data.name
        }
    },
}


export const getUserByEmailRef = (email: string) => query(collection(db, 'users'), where('email', '==', email)).withConverter(userConvertor);