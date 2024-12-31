<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMembersRequest;
use App\Http\Requests\MembersUpdateRequest;
use App\Http\Resources\MembersResource;
use App\Models\Member;
use App\Models\User;
use Error;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function editMember(MembersUpdateRequest $request, string $id): JsonResponse{
        $dataValidated = $request->validated();
        $members = Member::where('id', $id)->first();

        if (!$members) {
            throw new HttpResponseException(response([
                'message' => 'User not found'
            ])->setStatusCode(404));
        }

        $members->name = $dataValidated['name'];
        $members->email = $dataValidated['email'];
        $members->phone = $dataValidated['phone'];
        $members->address = $dataValidated['address'];
        $members->save();

        return (new MembersResource($members))->response()->setStatusCode(201);
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
