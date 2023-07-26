var $currentInput;
var $currentLabel;
var $writeBtn = $('.write-btn');

function maskResolver(mask, value) {
    var resolver = IMask.createMask({
        mask: mask,
    });
    resolver.resolve(value);
    return resolver.value;
};

$(document).ready(function () {
    // Initialize masks for all inputs with 'data-mask' attribute
    $('input[data-mask]').each(function () {
        const mask = IMask(this, {
            mask: $(this).attr('data-mask'),
        });
    });


    // Example usage of updating input value programmatically
    function updateInputValue(inputElement, newValue) {
        try {
            var resolver = IMask.createMask({
                mask: $(inputElement).attr('data-mask'),
            });
            resolver.resolve(newValue);
            console.log(resolver.value);

            $(inputElement).val(resolver.value).trigger('change');
        } catch (error) {
            $(inputElement).val(newValue).trigger('change');
        }

    }

    $writeBtn.on('click', function () {
        $currentInput = $(this).closest('.form-control').find('input,textarea');
        console.log($currentInput[0]);
        $currentLabel = $(this).closest('.form-control').find('label');
        $('#label').text($currentLabel.text());

        // if currentInput is textarea, then set the result to html

    });

    $('#done').on('click', function () {
        var $result = $('#result').html();
        // replace all <br> with \n
        $result = $result.replace(/<br>/g, '\n');

        // if currentinput is type=number, then remove all non numeric character from result
        if ($currentInput.attr('type') == 'number') {
            $result = $result.replace(/\D/g, '');
        }

        updateInputValue($currentInput, $result);


    });



});
