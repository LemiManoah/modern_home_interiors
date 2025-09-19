<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['nullable', 'numeric', 'min:0', 'lt:price'],
            'stock_quantity' => ['required', 'numeric', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
            'is_featured' => ['sometimes', 'boolean'],

            // Images optional on update
            'images' => ['nullable'],
            'images.*' => ['file', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp', 'max:10240'],

            'primary_image_index' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'Category is required',
            'category_id.exists' => 'Selected category does not exist',
            'name.required' => 'Name is required',
            'name.string' => 'Enter a valid name',
            'name.max' => 'Name exceeds maximum length',
            'description.string' => 'Enter a valid description',
            'price.required' => 'Price is required',
            'price.numeric' => 'Enter a valid price',
            'price.min' => 'Price cannot be less than 0',
            'sale_price.numeric' => 'Enter a valid sale price',
            'sale_price.min' => 'Sale price cannot be less than 0',
            'sale_price.lt' => 'Sale price must be less than regular price',
            'stock_quantity.required' => 'Stock quantity is required',
            'stock_quantity.numeric' => 'Enter a valid stock quantity',
            'stock_quantity.min' => 'Stock quantity cannot be less than 0',
            'images.*.file' => 'Each file must be a valid file',
            'images.*.image' => 'Each file must be a valid image',
            'images.*.mimes' => 'Allowed formats: jpg, png, jpeg, gif, svg, webp',
            'images.*.max' => 'Each image must be less than 10MB',

            'primary_image_index.integer' => 'Primary image index must be a number',
            'primary_image_index.min' => 'Primary image index cannot be negative',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'sale_price' => $this->sale_price === '' ? null : $this->sale_price,
            'is_active' => (bool) ($this->is_active ?? true),
            'is_featured' => (bool) ($this->is_featured ?? false),
        ]);
    }
}
