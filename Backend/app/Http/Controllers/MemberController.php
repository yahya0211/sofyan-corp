<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMembersRequest;
use App\Http\Requests\MembersUpdateRequest;
use App\Http\Resources\MembersResource;
use App\Models\Member;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;


class MemberController extends Controller
{
    public function addMember(CreateMembersRequest $request): JsonResponse{
        $dataValidated = $request->validated();
        $members = new Member($dataValidated);

        $members->save();

        return (new MembersResource($members))->response()->setStatusCode(201);
    }

   public function getMember(string $id): MembersResource{
    $members = Member::where('id', $id)->first();

    if (!$members) {
        throw new HttpResponseException(response([
            'message' => 'User not found'
        ])->setStatusCode(404));
    }
    return new MembersResource($members);
   }

   public function getAllMembers(): JsonResponse{
       $members = Member::all();

       return response()->json([
        'success' => true,
        'data' => MembersResource::collection($members)
    ], 200);   }

    public function editMember(MembersUpdateRequest $request, string $id): JsonResponse
{
    $dataValidated = $request->validated();
    $member = Member::find($id);

    if (!$member) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    // Cek apakah data yang diterima sama dengan data yang sudah ada
    if (
        $member->name === $dataValidated['name'] ||
        $member->email === $dataValidated['email'] ||
        $member->phone === $dataValidated['phone'] ||
        $member->address === $dataValidated['address']
    ) {
        return response()->json([
            'message' => 'Tidak ada perubahan pada data',
            'data' => new MembersResource($member)
        ], 200); // Status 200 menunjukkan bahwa tidak ada perubahan
    }

    // Update data jika ada perubahan
    $member->name = $dataValidated['name'];
    $member->email = $dataValidated['email'];
    $member->phone = $dataValidated['phone'];
    $member->address = $dataValidated['address'];
    $member->save();

    return (new MembersResource($member))->response()->setStatusCode(201);
}


    public function deleteMember(string $id): JsonResponse{
        $members = Member::where('id', $id)->first();

        if (!$members) {
            throw new HttpResponseException(response([
                'message' => 'User not found'
            ])->setStatusCode(404));
        }

        $members->delete();

        return response()->json([
            'success' => true,
            'message' => 'Member deleted successfully'
        ], 200);
    }
}
