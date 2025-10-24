let currentStep = 1;
const totalSteps = 6;
const steps = document.querySelectorAll('.step-content');
const indicators = document.querySelectorAll('.step');
const progress = document.getElementById('progress');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');

function showStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    indicators[step - 1].classList.add('active');
    progress.style.width = (step / totalSteps) * 100 + '%';
    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    if (step === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
    if (step === 6) {
        generateReviewSummary();
    }
}

function validateStep(step) {
    let isValid = true;
    const currentStepContent = document.querySelector(`[data-step="${step}"]`);
    const errors = currentStepContent.querySelectorAll('.error');
    errors.forEach(error => error.remove());

    if (step === 1) {
        const fullName = document.getElementById('fullName').value.trim();
        const age = document.getElementById('age').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const city = document.getElementById('city').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!fullName) {
            showError('fullName', 'الاسم الكامل مطلوب.');
            isValid = false;
        }
        if (!age || age < 1 || age > 120) {
            showError('age', 'العمر يجب أن يكون بين 1 و 120.');
            isValid = false;
        }
        if (!gender) {
            showError('gender', 'يرجى اختيار الجنس.');
            isValid = false;
        }
        if (!city) {
            showError('city', 'المدينة / القرية مطلوبة.');
            isValid = false;
        }
        if (!phone || !/^\+?[\d\s\-\(\)]+$/.test(phone)) {
            showError('phone', 'رقم الهاتف غير صالح.');
            isValid = false;
        }
    } else if (step === 2) {
        const skills = document.querySelectorAll('input[name="skills"]:checked');
        if (skills.length === 0) {
            showError('skills', 'يرجى اختيار مهارة واحدة على الأقل.');
            isValid = false;
        }
    } else if (step === 3) {
        const whyJoin = document.getElementById('whyJoin').value.trim();
        const inspiration = document.getElementById('inspiration').value.trim();
        if (!whyJoin) {
            showError('whyJoin', 'يرجى شرح دوافعك للانضمام.');
            isValid = false;
        }
        if (!inspiration) {
            showError('inspiration', 'يرجى شرح ما يلهمك.');
            isValid = false;
        }
    } else if (step === 4) {
        const localCommunity = document.querySelector('input[name="localCommunity"]:checked');
        const hours = document.querySelector('input[name="hours"]:checked');
        if (!localCommunity) {
            showError('localCommunity', 'يرجى الإجابة عن تأسيس مجتمع محلي.');
            isValid = false;
        }
        if (!hours) {
            showError('hours', 'يرجى اختيار عدد الساعات.');
            isValid = false;
        }
    } else if (step === 5) {
        const role = document.getElementById('role').value.trim();
        const commitment = document.querySelector('input[name="commitment"]:checked');
        if (!role) {
            showError('role', 'يرجى وصف دورك.');
            isValid = false;
        }
        if (!commitment) {
            showError('commitment', 'يرجى الإجابة عن الالتزام بالقيم.');
            isValid = false;
        }
    } else if (step === 6) {
        const confirm = document.querySelector('input[name="confirm"]:checked');
        if (!confirm || confirm.value !== 'yes') {
            showError('confirm', 'يرجى تأكيد المعلومات.');
            isValid = false;
        }
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId) || document.querySelector(`input[name="${fieldId}"]`);
    if (field) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        error.style.color = 'red';
        error.style.fontSize = '14px';
        error.style.marginTop = '5px';
        field.parentNode.insertBefore(error, field.nextSibling);
    }
}

function generateReviewSummary() {
    const summaryDiv = document.getElementById('reviewSummary');
    summaryDiv.innerHTML = `
        <p><strong>الاسم الكامل:</strong> ${document.getElementById('fullName').value}</p>
        <p><strong>العمر:</strong> ${document.getElementById('age').value}</p>
        <p><strong>الجنس:</strong> ${document.querySelector('input[name="gender"]:checked')?.value}</p>
        <p><strong>المدينة / القرية:</strong> ${document.getElementById('city').value}</p>
        <p><strong>رقم الهاتف:</strong> ${document.getElementById('phone').value}</p>
        <p><strong>البريد الإلكتروني:</strong> ${document.getElementById('email').value || 'غير محدد'}</p>
        <p><strong>المهارات:</strong> ${Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value).join(', ') || 'لا توجد'}</p>
        <p><strong>أخرى:</strong> ${document.getElementById('otherSkills').value || 'لا توجد'}</p>
        <p><strong>دوافع الانضمام:</strong> ${document.getElementById('whyJoin').value}</p>
        <p><strong>ما يلهمك:</strong> ${document.getElementById('inspiration').value}</p>
        <p><strong>تأسيس مجتمع محلي:</strong> ${document.querySelector('input[name="localCommunity"]:checked')?.value}</p>
        <p><strong>اسم المنطقة:</strong> ${document.getElementById('communityArea').value || 'غير محدد'}</p>
        <p><strong>ساعات أسبوعية:</strong> ${document.querySelector('input[name="hours"]:checked')?.value}</p>
        <p><strong>دورك في بناء سودان جديد:</strong> ${document.getElementById('role').value}</p>
        <p><strong>التزام بالقيم:</strong> ${document.querySelector('input[name="commitment"]:checked')?.value}</p>
    `;
}

nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

document.getElementById('membershipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const confirm = document.querySelector('input[name="confirm"]:checked');
    if (!confirm || confirm.value !== 'yes') {
        alert('يرجى تأكيد المعلومات في خطوة المراجعة.');
        return;
    }
    let message = 'استمارة عضوية – مجتمع "أنت صاحب المنصة":\n\n';
    message += '🔷 المعلومات الشخصية:\n';
    message += 'الاسم الكامل: ' + document.getElementById('fullName').value + '\n';
    message += 'العمر: ' + document.getElementById('age').value + '\n';
    message += 'الجنس: ' + document.querySelector('input[name="gender"]:checked').value + '\n';
    message += 'المدينة / القرية: ' + document.getElementById('city').value + '\n';
    message += 'رقم الهاتف / واتساب: ' + document.getElementById('phone').value + '\n';
    message += 'البريد الإلكتروني: ' + document.getElementById('email').value + '\n\n';
    message += '🔷 المهارات والمجالات:\n';
    let skills = [];
    document.querySelectorAll('input[name="skills"]:checked').forEach(function(cb) {
        skills.push(cb.value);
    });
    message += skills.join(', ') + '\n';
    if (document.getElementById('otherSkills').value) {
        message += 'أخرى: ' + document.getElementById('otherSkills').value + '\n';
    }
    message += '\n🔷 دوافعك للانضمام:\n';
    message += 'لماذا تريد الانضمام: ' + document.getElementById('whyJoin').value + '\n';
    message += 'ما يلهمك: ' + document.getElementById('inspiration').value + '\n\n';
    message += '🔷 التزامك المجتمعي:\n';
    message += 'تأسيس مجتمع محلي: ' + document.querySelector('input[name="localCommunity"]:checked').value + '\n';
    if (document.getElementById('communityArea').value) {
        message += 'اسم المنطقة: ' + document.getElementById('communityArea').value + '\n';
    }
    message += 'ساعات أسبوعية: ' + document.querySelector('input[name="hours"]:checked').value + '\n\n';
    message += '🔷 رؤيتك الشخصية:\n';
    message += 'دورك في بناء سودان جديد: ' + document.getElementById('role').value + '\n';
    message += 'التزام بالقيم: ' + document.querySelector('input[name="commitment"]:checked').value + '\n';
    let summary = 'الاسم: ' + document.getElementById('fullName').value + ', العمر: ' + document.getElementById('age').value + ', المدينة: ' + document.getElementById('city').value + ', الهاتف: ' + document.getElementById('phone').value;
    alert('تم إرسال الاستمارة بنجاح!\nملخص: ' + summary);
    window.open('https://wa.me/message/QTLJ4LOSGZKJG1?text=' + encodeURIComponent(message), '_blank');
    window.open('mailto:alsadaghamid@gmail.com?subject=استمارة عضوية&body=' + encodeURIComponent(message), '_blank');
});

document.getElementById('downloadPdf').addEventListener('click', function() {
    html2pdf().set({
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
            floatPrecision: 16
        }
    }).from(document.querySelector('.container')).save('membership-form.pdf');
});

showStep(currentStep);