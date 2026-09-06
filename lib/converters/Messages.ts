import { db } from '@/firebase'
import { LanguageSupported } from '@/store/store';
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


export interface User {
    id: string;
    email: string;
    name: string;
    image: string;
}





export interface Message {
    id?: string;
    input: string;
    timestamp: Date;
    user: User;
    translated?: {
        [K in LanguageSupported]? : string
    }
}


const messageConvertor: FirestoreDataConverter<Message> = {
    toFirestore: function(message: Message): DocumentData {
        return {
            input: message.input,
            timestamp: message.timestamp,
            user: message.user
        }
    },
    fromFirestore: function(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Message{
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            input: data.input,
            timestamp: data.timestamp?.toDate(),
            user: data.user,
            translated: data.translated
        }
    }
}


export const messageRef = (chatId: string) => collection(db, "chats", chatId, "messages").withConverter(messageConvertor);
export const limitedMessageRef = (chatId: string) => query(messageRef(chatId), limit(25));
export const sortedMessagesRef = (chatId: string) => query(messageRef(chatId), orderBy("timestamp", "asc"))
export const limitedSortedMessagesRef = (chatId: string) => query(messageRef(chatId), limit(1)).withConverter(messageConvertor);