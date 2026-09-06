import { db } from "@/firebase";
import { adminDb } from "@/firebase-admin";
import { chatMemberAdminRef } from "@/lib/converters/ChatMembers";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const { chatId, adminId } = await req.json();
    const refs = adminDb.collection("chats").doc(chatId);
    const adminIdFromDb = (await getDocs(chatMemberAdminRef(chatId))).docs.map(doc => doc.id);
    
    const bulkWriter = adminDb.bulkWriter();
    const MAX_RETRY_ATTEMPTS = 5;

    bulkWriter.onWriteError((error) => {
        if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
            return true;
        }
        else{
            return false;
        }
    });

    try {
        if (adminId !== adminIdFromDb[0]) {
            return NextResponse.json({
                succeess: false
            }, {
                status: 401
            })
        }
        await adminDb.recursiveDelete(refs, bulkWriter);
        return NextResponse.json({
            succeess: true
        }, {
            status: 200
        })
    } catch (error) {
        console.log("server error at",error);
        
        return NextResponse.json({
            succeess: false
        }, {
            status: 500
        })
    }
}