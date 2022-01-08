<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function upload(Request $request)
    {
        // ====================================
        // validate
        // Normaly the validation is with only "image", but the content is base64 encoded.
        $request->validate([
            'file_base64' => 'required|regex:/^data:image/',
            'output'      => 'required',
        ]);

        // ====================================
        // get content
        // Have to extract de clean base64 string, without the initial "data:image/xxx,base64,......."
        $file_content = base64_decode(substr($request->file_base64, strpos($request->file_base64, ',') + 1));

        // ====================================
        // get mime_type and define the extension.
        //base64 dont come with this data.
        $image_info   = getimagesize($request->file_base64);
        $mime_type    = $image_info['mime'];
        switch ($mime_type) {
            case 'image/jpeg':
            case 'image/jpg':
             $ext = 'jpg';

                break;
                
            case 'image/png':
             $ext = 'png';

                break;
        }

        // ====================================
        // set filename
        $filename = uniqid();

        // ====================================
        // start manipulations and uploads
        
        //First - upload de original, even if the output is not for the original
        //This is mandatory for read orientation (in exif data of image)
        //and orientate the image correctly
        //https://image.intervention.io/v2/api/orientate
        //If original or all not selected, the original file will be deleted;
        Storage::put($filename . '_original.' . $ext, $file_content);

        //Create canvas for the last 2 options
        if (in_array($request->output, ['square', 'small', 'all'])) {
            //Create a canvas with the biggest side
            $biggest_side           = max($image_info[0], $image_info[1]);
            $square_canvas          = Image::canvas($biggest_side, $biggest_side, '#fff');

            //Read the original image then orientate
            $img = Image::make(storage_path('app/' . $filename . '_original.' . $ext))->orientate();

            $square_canvas->insert($img, 'center');
        }

        if (in_array($request->output, ['square', 'all'])) {
            Storage::put($filename . '_square.' . $ext, $square_canvas->stream());
        }

        if (in_array($request->output, ['small', 'all'])) {
            Storage::put($filename . '_small.' . $ext, $square_canvas->resize(256, 256)->stream());
        }

        //Delete the possible temp original image
        if (! in_array($request->output, ['original', 'all'])) {
            Storage::delete($filename . '_original.' . $ext);
        }

        return [
            'errors' => false,
        ];
    }
}
