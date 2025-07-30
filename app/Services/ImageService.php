<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Storage;

class ImageService
{

    protected string $folder;
    protected string $field = "image";

    public function __construct(string $folder)
    {
        $this->folder = $folder;
    }

    public function setField(string $field): ImageService
    {
        $this->field = $field;
        return $this;
    }

    public function upload(array $data, string $oldPath = null): array
    {
        if (isset($data[$this->field]) && $data[$this->field] instanceof UploadedFile) {
            $path = $data[$this->field]->store($this->folder, "public");
            if ($oldPath) {
                Storage::disk("public")->delete($oldPath);
            }
            $data[$this->field] = $path;
        }
        return $data;
    }


}
