let currentStep = 1;
const totalSteps = 5;
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
}

nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
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