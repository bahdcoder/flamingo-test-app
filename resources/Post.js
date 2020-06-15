const { Resource, ID, Text, DateField, ObjectField } = require('@flamingo/core')

class Post extends Resource {

    messages() {
        return {
            'title.required': 'The title field is required.',
            'publishedAt.required': 'The published at field is required.'
        }
    }

    fields() {
        return [
            ID.make(),
            Text.make('Title')
                .sortable()
                .rules('required', 'string', 'min:6', 'max:20'),
            DateField.make('Published at')
                .firstDayOfWeek(4)
                .rules('required', 'date'),
            ObjectField.make('Billing Address').fields([
                Text.make('Country')
                    .rules('required', 'string', 'min:6', 'max:20').default('United States'),
                Text.make('State')
                    .rules('required').default('California'),
                Text.make('City')
                    .rules('required').default('San Francisco'),
                Text.make('Postal Code')
                    .rules('required', 'number').default(94105)
            ]).rules('object', 'required').description('Define the billing address for this post. All payment receipts copies will be sent here.')
        ]
    }
}

module.exports = Post
