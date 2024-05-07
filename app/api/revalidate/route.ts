import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
// import { parseBody } from 'next-sanity/webhook';

// type WebhookPayload = {
//   _type: string;
// };

// export async function POST(req: NextRequest) {
//   try {
//     const { isValidSignature, body } = await parseBody<WebhookPayload>(
//       req,
//       process.env.SANITY_HOOK_SECRET
//     );

//     if (!isValidSignature) {
//       const message = 'Invalid signature';
//       return new Response(JSON.stringify({ message, isValidSignature, body }), {
//         status: 401,
//       });
//     }

//     if (!body?._type) {
//       const message = 'Bad Request';
//       return new Response(JSON.stringify({ message, body }), { status: 400 });
//     }

//     revalidateTag(body._type);

//     return NextResponse.json({
//       status: 200,
//       revalidated: true,
//       now: Date.now(),
//       body,
//     });
//   } catch (err: any) {
//     console.error(err);
//     return new Response(err.message, { status: 500 });
//   }
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { tag: string } }
// ) {
//   const tag = params.tag;

//   revalidateTag(tag);

//   return NextResponse.json(
//     tag ? tag + ' revalidated!' : { error: 'No tag provided' }
//   );
// }

export async function GET() {
  const tags = ['project', 'teamMember', 'reservoirProject'];

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json('Content revalidated!');
}
