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

        // if inputElement [type="tags"], then append newValue to the value array as {value: newValue};
        if ($(inputElement).attr('type') == 'tags') {
            var inputName = $(inputElement).attr('name');
            var tagifyObject = tagifies[inputName];
            tagifyObject.addTags([{ value: newValue }]);
            return;
        }

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
        $currentValue = $currentInput.val();
        console.log($currentInput[0]);
        $currentLabel = $(this).closest('.form-control').find('label');
        $('#label').text($currentLabel.text());

        // if currentInput is textarea, set the dialog data-input-mode to 'textarea'
        if ($currentInput.is('textarea')) {
            editorElement.editor.import_($currentValue, 'text/plain');
            editorElement.editor.configuration.recognitionParams.iink.text.guides.enable = true;
        } else {
            editorElement.editor.configuration.recognitionParams.iink.text.guides.enable = false;
        };

        // // if currentInput type!='tags' then 
        // if ($currentInput.attr('type') != 'tags') {
            
        // };
        

    });

    $('#done').on('click', function () {
        var $result = $('#result').val();
        // replace all <br> with \n
        $result = $result.replace(/<br>/g, '\n');

        updateInputValue($currentInput, $result);

        // highlight the input
        $currentInput.closest('.form-control,field').addClass('highlight');
        $currentInput.closest('.form-control,field').addClass('active');
        // add transition to highlight
        $currentInput.closest('.form-control,field').css('transition', 'all 1s ease');

        // remove highlight after 2 seconds
        setTimeout(function () {
            $currentInput.closest('.form-control,field').removeClass('active');
            //remove transition after 1 second
            setTimeout(function () {
                $currentInput.closest('.form-control,field').removeClass('highlight');
            }, 1000);
        }, 2000);
    });



});
